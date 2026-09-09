// app\api\properties\upload\route.ts
import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/session";

const allowedContentTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export async function POST(
  request: Request,
): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async (pathname) => {
        const session = await getAdminSession();

        if (!session) {
          throw new Error("Usuário não autorizado.");
        }

        if (!pathname.startsWith("properties/")) {
          throw new Error("Caminho de upload inválido.");
        }

        return {
          allowedContentTypes,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            email: session.email,
          }),
        };
      },

      onUploadCompleted: async () => {
        /*
         * O vínculo com o imóvel será realizado pela Server Action
         * depois que todos os uploads terminarem.
         */
      },
    });

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível enviar a imagem.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 400,
      },
    );
  }
}