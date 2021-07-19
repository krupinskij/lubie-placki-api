import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginationInput {
  @Field()
  readonly page: number;
  @Field({ defaultValue: 10 })
  readonly limit: number;
}