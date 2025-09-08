-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Expenses" (
    "ex_id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("ex_id")
);

-- CreateTable
CREATE TABLE "public"."Categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "public"."Categories"("category_name");

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
