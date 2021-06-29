import { Injectable, Logger } from '@nestjs/common';
import { Link, Prisma } from 'db';
import { nanoid } from 'nanoid';

import { ShowDto } from './dto/show.dto';
import { PrismaService } from '../../prisma.service';

const { APP_URL } = process.env;

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);
  constructor(private prisma: PrismaService) {}

  /**
   * Generates a url-safe short code
   *
   * @remarks At 10,000 IDs per second, it'd take roughly 11 days to have a 1% probability of a collision.
   * @link https://zelark.github.io/nano-id-cc/
   * @param length The number of characters to include in generated string
   * @returns string
   */

  generateShortCode(length = 12) {
    return nanoid(length);
  }

  async findOne(
    linkWhereUniqueInput: Prisma.LinkWhereUniqueInput,
  ): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: linkWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LinkWhereUniqueInput;
    where?: Prisma.LinkWhereInput;
    orderBy?: Prisma.LinkOrderByInput;
  }): Promise<Link[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.link.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(
    data: Omit<Prisma.LinkCreateInput, 'hash' | 'link'>,
  ): Promise<ShowDto> {
    // Just a quick explanation here: two scenarios could arise
    // 1. We could SHA the provided url and check for existing ones, then just return it.
    // 2. We can do what we're doing here, and just create new records, with the thought being that if links were ever
    // attributable to an 'owner', we would need unique records for tracking purposes.
    // At that point, we could do the SHA check, provide contextual data back to the UI, and allow for a 'force create'.

    const hash = this.generateShortCode();
    const link = `${APP_URL}/${hash}`;

    const record = { ...data, hash, link };

    // Even though there is a very low chance that we're going to have a collision,
    // let's make it a little safer
    let newRecord: Link;
    let attempts = 20;
    while (!newRecord && attempts > 0) {
      try {
        newRecord = await this.prisma.link.create({
          data: record,
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            attempts--;
          } else {
            throw err;
          }
        } else {
          // Not a collision, throw it
          throw err;
        }
      }
    }

    if (!newRecord) {
      this.logger.log(
        'Failed to generated a new record for data',
        JSON.stringify(record),
      );
      throw new Error('Failed to generate a new record');
    }

    return newRecord;
  }

  async update(params: {
    where: Prisma.LinkWhereUniqueInput;
    data: Prisma.LinkUpdateInput;
  }): Promise<Link> {
    const { where, data } = params;
    return this.prisma.link.update({
      data,
      where,
    });
  }

  async destroy(where: Prisma.LinkWhereUniqueInput): Promise<Link> {
    return this.prisma.link.delete({
      where,
    });
  }
}
