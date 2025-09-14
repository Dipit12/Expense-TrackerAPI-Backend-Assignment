import prisma from "./connectToDB";

export const populateCategoryDB = async () => {
  try {
    const categories = [
      { category_name: "Food" },
      { category_name: "Travel" },
      { category_name: "Shopping" },
      { category_name: "Entertainment" },
      { category_name: "Bills" },
    ];

    await prisma.categories.createMany({
      data: categories,
      skipDuplicates: true, // prevent duplicates
    });

    console.log("✅ Categories populated successfully");
  } catch (err) {
    console.error("❌ Error populating category DB:", err);
  }
};
