import { UserProfile } from "@/components.types";
import Link from "next/link";
import Button from "@/components/Button";
import { getUser, getUserByName } from "@/app/lib/actions";

type Props = {
  params: {
    email: string;
  };
};

const ProfilePage = async ({ params }: Props) => {
  const email = decodeURIComponent(params.email);
  const userFull = (await getUser(email)) as {
    mongo: any;
    user?: UserProfile;
  };
  const user = userFull.mongo.user;
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            I’m Software Engineer 👋
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Link href={`mailto:${user?.email}`}>
              <Button title={user?.email} leftIcon="/email.svg" />
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
