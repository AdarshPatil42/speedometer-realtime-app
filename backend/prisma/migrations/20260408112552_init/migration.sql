-- CreateTable
CREATE TABLE "SpeedData" (
    "id" SERIAL NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeedData_pkey" PRIMARY KEY ("id")
);
