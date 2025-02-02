import prisma from "@/utils/db";
import { CreateTodoDto } from "@/utils/dtos";
import { createTodochema } from "@/utils/validationSchema";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTodoDto;

    const validation = createTodochema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    const todo = await prisma.todo.findFirst({
      where: {
        task: body.task,
      },
    });

    if (todo) {
      return NextResponse.json(
        { message: "Task existe déjà!" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        task: body.task,
        description: body.description,
        status: body.status,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json("Supprimé avec succès!", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
