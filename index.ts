import { PrismaClient, Prisma, User, Account } from '@prisma/client';

const prisma = new PrismaClient();

const newClient = async (newUser: any) => {
  try {

    const findUser = await prisma.user.findUnique({
      where: {
        email: newUser.email
      }
    })

    if (findUser) {
      throw new Error('Email já cadastrado');
    }

    newUser['Account'] = {
      create: {
        wallet: 100,
      }
    }

    const user = prisma.user.create({
      data: newUser,
    });

    return prisma.$transaction([user]);

  } catch (error: any) {
    console.log(error.message);
  }
}


const newMoviment = async (
  origin: string,
  target: string,
  amount: number,
) => {
  try {
    const findOriginAccount = await prisma.user.findUnique({
      where: {
        email: origin
      },
      include: {
        Account: true,
      }
    });

    if (!findOriginAccount) {
      throw new Error('Conta inexistente');
    }

    const findTargetAccount = await prisma.user.findUnique({
      where: {
        email: target
      },
      include: {
        Account: true,
      }
    });

    if (!findTargetAccount) {
      throw new Error('Conta inexistente');
    }

    if (findOriginAccount.Account.wallet < amount) {
      throw new Error('Saldo insuficiente');
    }

    const updateOriginAccount = prisma.account.update({
      where: {
        id: findOriginAccount.Account.id,
      },
      data: {
        wallet: findOriginAccount.Account.wallet - amount,
      }
    })

    const updateTargetAccount = prisma.account.update({
      where: {
        id: findTargetAccount.Account.id,
      },
      data: {
        wallet: findTargetAccount.Account.wallet + amount,
      }
    });

    const transfer = {
      origin_id: findOriginAccount.Account.id,
      target_id: findTargetAccount.Account.id,
      amount: amount,
    }

    const moviment = prisma.moviment.create({
      data: transfer,
    })

    return prisma.$transaction([updateOriginAccount, updateTargetAccount, moviment]);

  } catch (error: any) {
    console.log(error.message);
  }
}

// const register = await newClient({
//   name: 'Beatriz',
//   lastName: 'Ramalho',
//   email: 'beatriz.dev@gmail.com',
// })

const moviment = await newMoviment(
  "ramalho.sit@gmail.com", // Alan
  "beatriz.dev@gmail.com", // Beatriz
  80,
);

console.log(moviment);

