import faker from 'faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const listOfNewUsers = [...new Array(5)].map(() => {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
			username: faker.unique(faker.name.findName),
			avatar: faker.image.image(),
			createdAt: faker.date.recent(),
			updatedAt: faker.date.recent(),
      lists: {
        create: {
          title: faker.lorem.sentence(),
					description: faker.lorem.paragraph(),
					coverPhoto: faker.image.imageUrl(),
					createdAt: faker.date.recent(),
					updatedAt: faker.date.recent(),
					items: {
						create: [
							{
								name: faker.hacker.noun(),
								image: faker.image.imageUrl(),
								description: faker.lorem.paragraph(),
							},
							{
								name: faker.hacker.noun(),
								image: faker.image.imageUrl(),
								description: faker.lorem.paragraph(),
							},
							{
								name: faker.hacker.noun(),
								image: faker.image.imageUrl(),
								description: faker.lorem.paragraph(),
							},
							{
								name: faker.hacker.noun(),
								image: faker.image.imageUrl(),
								description: faker.lorem.paragraph(),
							},
						]
					}
        },
      },
    };
  });

  for (let data of listOfNewUsers) {
    const user = await prisma.user.create({
      data,
    });

    console.log(user);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// async function main() {
// 	for (let user of users) {
// 		await prisma.user.create({
// 			data: user
// 		})
// 	}
// }

// main().catch(e => {
// 	console.log(e)
// 	process.exit(1)
// }).finally(() => {
// 	prisma.$disconnect()
// })
