import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  href: string | URL;
  as?: string;
};

export default function Link(props: Props) {
  return (
    <NextLink href={props.href} as={props.as} passHref>
      {props.children}
    </NextLink>
  );
}
