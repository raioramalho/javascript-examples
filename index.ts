import { Course, Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();


async function createCourseAndUser(courseData: any, userData: any) {
  const findCourse = await prisma.course.findFirst({
    where: {
      course_name: userData.course_name,
    }
  });

  if (!findCourse) {
    const course_name = userData.course_name;
    delete userData.course_name;
    const transaction = await prisma.$transaction([
      prisma.course.create({
        data: {
          course_name: course_name,
          students: {
            connectOrCreate: {
              where: {
                email: userData.email,
              },
              create: {
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
              },
            }
          }
        },
      }),

    ]);

    return transaction;

  } else {
    delete userData.course_name;
    userData['course_id'] = findCourse?.id;

    const transaction = await prisma.$transaction([
      prisma.user.create({ data: userData }),
    ]);

    return transaction;
  }
}

const createCourse = createCourseAndUser(
  {},
  {
    name: 'User4',
    lastName: 'Student4',
    email: 'Student4@prisma.',
    course_name: 'Spring_course',
    course_id: 0,
  }
);
