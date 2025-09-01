import seedDatabase from '../src/lib/seed.js';

async function main() {
  console.log('Starting database seeding...');
  await seedDatabase();
  console.log('Database seeding completed!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Error in seeding script:', error);
  process.exit(1);
});