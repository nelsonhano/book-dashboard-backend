import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UpdateBookResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => ID)
  affected?: number;
}
