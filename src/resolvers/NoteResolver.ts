import { Note } from "../entity/Note";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class NoteResolver {
  @Mutation(() => Boolean)
  async createNote(@Arg("content") content: string) {
    Note.insert({ content });
    return true;
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
