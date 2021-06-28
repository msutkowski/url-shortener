-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "long_url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link.hash_unique" ON "Link"("hash");
