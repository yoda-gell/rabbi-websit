-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "askerName" TEXT,
    "askerEmail" TEXT NOT NULL,
    "wantsPublishedAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "labels" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
