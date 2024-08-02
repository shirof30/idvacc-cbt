/*
  Warnings:

  - Added the required column `courseId` to the `VerifyCode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerifyCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VerifyCode" ("cid", "createdAt", "id", "status", "updatedAt") SELECT "cid", "createdAt", "id", "status", "updatedAt" FROM "VerifyCode";
DROP TABLE "VerifyCode";
ALTER TABLE "new_VerifyCode" RENAME TO "VerifyCode";
CREATE UNIQUE INDEX "VerifyCode_cid_key" ON "VerifyCode"("cid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
