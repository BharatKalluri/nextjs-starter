import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebase-admin";
import { auth } from "firebase-admin/lib/auth";

export default async function serverSidePropsAuthGuard(
  ctx: GetServerSidePropsContext
): Promise<
  | { tokenData: auth.DecodedIdToken; err: null }
  | { tokenData: null; err: Error }
> {
  try {
    const cookies = nookies.get(ctx);
    return {
      tokenData: await firebaseAdmin.auth().verifyIdToken(cookies.token),
      err: null,
    };
  } catch (err) {
    return { tokenData: null, err };
  }
}
