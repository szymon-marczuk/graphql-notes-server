import { Note } from "../entity/Note";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class NoteResolver {
  @Mutation(() => Note)
  async createNote(@Arg("content") content: string) {
    const note = await Note.create({ content }).save();
    console.log(note);
    return note;
  }

  @Mutation(() => Boolean)
  async deleteNote(@Arg("id", () => Int) id: number) {
    await Note.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async editNote(
    @Arg("id", () => Int) id: number,
    @Arg("content", () => String) content: string
  ) {
    await Note.update(id, { content });
    return true;
  }

  @Query(() => [Note])
  notes() {
    return Note.find();
  }

  @Query(() => [Note])
  async queryNote(@Arg("id", () => Int) id: number) {
    return await Note.findByIds([id]);
  }
}
