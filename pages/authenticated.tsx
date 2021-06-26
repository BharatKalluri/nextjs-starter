import React from "react";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "../components/layout";
import serverSidePropsAuthGuard from "../lib/guards/server-side-props-auth.guard";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // This needs to be repeated for all server side authenticated pages :(
  const { tokenData, err } = await serverSidePropsAuthGuard(ctx);
  if (err !== null) {
    return {
      redirect: { permanent: false, destination: "/" },
      props: {} as never,
    };
  }

  return {
    props: {
      message: `Your email is ${tokenData?.email} and your UID is ${tokenData?.uid}.`,
    },
  };
};

function AuthenticatedPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Layout title={"Authenticated page"}>
      <p>{props.message!}</p>
    </Layout>
  );
}

export default AuthenticatedPage;
