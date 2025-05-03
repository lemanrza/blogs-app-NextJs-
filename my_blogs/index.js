// index.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blog.findMany();
  console.log(blogs);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
