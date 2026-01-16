/*
  Warnings:

  - The `answer` column on the `QuizQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "answerOptions" TEXT[],
DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];
