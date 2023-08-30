import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

console.clear();
console.log("listing accounts...");
const accounts = await prisma.user.findMany({
  include: {
    Account: true,
  }
});
console.log(accounts);

console.log("start transaction...")

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
        wallet: 200,
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
        wallet: {
          decrement: amount,
        }
      },
      include: {
        User: true,
      }
    })

    const updateTargetAccount = prisma.account.update({
      where: {
        id: findTargetAccount.Account.id,
      },
      data: {
        wallet: {
          increment: amount,
        }
      },
      include: {
        User: true,
      }
    });

    const transfer = {
      origin_id: findOriginAccount.Account.id,
      target_id: findTargetAccount.Account.id,
      amount: amount,
      moviment_type: "transfer",
    }

    const moviment = prisma.moviment.create({
      data: transfer
    })

    return prisma.$transaction([updateOriginAccount, updateTargetAccount, moviment]);

  } catch (error: any) {
    console.log(error.message);
  }
}


