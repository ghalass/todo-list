import prisma from "@/utils/db";
import { CreateTodoDto, UpdateTodoDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTodoDto;

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

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as UpdateTodoDto;

    console.log(body);

    const todo = await prisma.todo.findFirst({
      where: {
        id: { not: body.id },
        task: body.task,
      },
    });

    if (todo) {
      return NextResponse.json(
        { message: "Task existe déjà!" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.update({
      where: { id: body.id },
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
