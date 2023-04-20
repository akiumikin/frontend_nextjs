import "@/styles/header.module.css";
import {
  Flex,
  Link,
  Image,
  Menu,
  MenuItem,
  MenuButton
} from "@aws-amplify/ui-react";
import { useRouter } from 'next/router';

const Header = () => {
  return (
    <div className="header">
      <Flex
        direction="row"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
        justifyContent="space-between"
      >
        <div className="header-left">
          <div className="header-logo">
            <Link href="/">
              <Image
                src='/next.svg'
                alt='logo'
                height='28px'
              />
            </Link>
          </div>
        </div>

        <div className="header-right">
          {/* {baseConfig.search ? <HeaderSearchBar /> : <></>} */}

          <HeaderNav />
        </div>
      </Flex>
    </div>
  );
};

const HeaderNav = () => {
  const router = useRouter();

  return (
    <>
      {/* {baseConfig.projectLink ? (
        <div className="github-link">
          <Link
            href={baseConfig.projectLink}
            isExternal={true}
            ariaLabel="github"
          >
            <AiFillGithub />
          </Link>
        </div>
      ) : (
        <></>
      )} */}

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <Image src='/images/profile.png' alt='profile' height='30px'/>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => router.push('/some-page')}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
