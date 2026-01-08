import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteBookResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
