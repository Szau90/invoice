import styles from "@/styles/SideBar.module.css";
import Logo from "../Logo";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/Hooks/hooks";
import { uiActions } from "@/store/ui-slice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);

  const toogleDarkLightHandler = () => {
    dispatch(uiActions.toogleDarkMode());
  };

  return (
    <>
      <div className={styles.bar}>
        <Logo />
        <div className={styles.wrapper}>
          {!darkMode && (
            <Image
              src={"/assets/icon-moon.svg"}
              width={20}
              height={20}
              alt={"icon-moon"}
              onClick={toogleDarkLightHandler}
            />
          )}
          {darkMode && (
            <Image
              src={"/assets/icon-sun.svg"}
              width={20}
              height={20}
              alt={"icon-sun"}
              onClick={toogleDarkLightHandler}
            />
          )}
          <div className={styles.line}></div>
          <Image
            className={styles.avatar}
            src={"/assets/image-avatar.jpg"}
            width={40}
            height={40}
            alt={"avatar-image"}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
