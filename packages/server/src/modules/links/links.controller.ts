import { LinksService } from './links.service';
import {
  Controller,
  Post,
  Body,
  Header,
  Get,
  Param,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiProperty,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Link as LinkModel } from 'db';
import { Response } from 'express';

const linkUrlProperties = {
  example: 'https://your.link/?with=some&parameter=banana',
  description: 'The URL that will be redirected to',
};

export class Link implements Partial<LinkModel> {
  @ApiProperty({
    example: 123,
    description: 'An internal id for the record',
  })
  id: number;
  @ApiProperty(linkUrlProperties)
  long_url: string;
  @ApiProperty({
    example: 'b4nANA129z3r',
    description: 'The unique hash generated for the link',
  })
  hash: string;
  @ApiProperty({
    example: 'https://shrt.ly/b4nANA129z3r',
    description: 'The short url that will redirect to the long_url',
  })
  link: string;
}

export class CreateLinkRequest implements Pick<LinkModel, 'long_url'> {
  @ApiProperty(linkUrlProperties)
  long_url: string;
}

@Controller()
export class LinksController {
  constructor(private readonly linkService: LinksService) {}

  @Post('generate')
  @Header('Content-Type', 'application/json')
  @ApiOperation({
    operationId: 'CreateLink',
    summary: 'Create a new shortened url',
  })
  @ApiResponse({
    status: 200,
    description: 'The new resource',
    type: Link,
  })
  @ApiBody({ type: CreateLinkRequest })
  async create(@Body() linkData: { long_url: string }): Promise<LinkModel> {
    return this.linkService.create(linkData);
  }

  @Get('check')
  @ApiOperation({
    operationId: 'ReadLink',
    summary: 'Finds a hash and returns the entity',
  })
  @ApiOkResponse({
    description: 'Returns a permanent redirect',
    type: Link,
  })
  async checkCode(@Query('hash') hash, @Res() res: Response) {
    try {
      const record = await this.linkService.findOne({ hash });

      if (record) {
        return res.json(record);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json('We were unable to find the given hash');
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('There was an unknown error');
    }
  }

  // We want to make sure this is always the last entry and considered to be a 'fallthrough'.
  @Get(':hash')
  @ApiOperation({
    operationId: 'FindLinkAndRedirect',
    summary: 'Find a hash and perform a redirect',
  })
  @ApiResponse({
    status: HttpStatus.PERMANENT_REDIRECT,
    description: 'Returns a permanent redirect',
  })
  async findAndRedirect(@Param('hash') hash: string, @Res() res: Response) {
    try {
      const record = await this.linkService.findOne({ hash });

      if (record) {
        return res.redirect(HttpStatus.PERMANENT_REDIRECT, record.long_url);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json('We were unable to find the given hash');
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('There was an error');
    }
  }
}
