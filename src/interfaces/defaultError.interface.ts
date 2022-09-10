import { Type, Static } from "@sinclair/typebox";

export const DefaultErrorResponseSchema = Type.Object({
  message: Type.String(),
});

export type DefaultResponse = Static<typeof DefaultErrorResponseSchema>;