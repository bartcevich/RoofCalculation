"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assets/images/logo.png";
import React, { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { px } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navigation: React.FC = () => {
  const [isTop, setIsTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFirstLink, setShowFirstLink] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //console.log("1=", lastScrollY, currentScrollY);
      if (currentScrollY > lastScrollY) {
        setIsTop(true);
        //console.log("2=", isTop);
      } else if (currentScrollY < lastScrollY) {
        setIsTop(false);
        //console.log("3=", isTop);
      }
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 743);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTop]);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setShowFirstLink((prevValue) => !prevValue);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isMobile]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [openMenu1, setOpenMenu1] = useState(false);
  const handleClick1 = () => {
    setOpenMenu1((prevValue) => !prevValue);
  };
  const [openMenu2, setOpenMenu2] = useState(false);
  const handleClick2 = () => {
    setOpenMenu2((prevValue) => !prevValue);
  };
  const handleClick3 = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`${styles.siteNav} ${isTop ? styles.top : ""} ${
          isMobile ? styles.mobile : ""
        }`}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src={logo} alt="image" />
          </div>
          {(!isMobile || showFirstLink) && (
            <a className={styles.siteName} href="/">
              Список продуктов
              <br />в пару кликов
            </a>
          )}
          {(!isMobile || !showFirstLink) && (
            <Link
              className={`${styles.siteName} ${styles.readyMenu}`}
              href="/favoriteMenu"
            >
              Готовые варианты
              <br />
              меню для вас
            </Link>
          )}
        </div>
        <Link
          className={styles.faSearch}
          // onClick={handleClick3}
          href="/cookFromAvailable"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Link>
        {(!isMobile || isMenuOpen) && (
          <div className={styles.mobileMenu}>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle} onClick={handleClick2}>
                <span></span>От нутрициолога
              </div>
              {openMenu2 && (
                <div
                  className={
                    !isMobile
                      ? styles.dropdownContent
                      : styles.dropdownContentMobile
                  }
                >
                  <Link href="/programs">
                    Витамины - какие, когда и сколько?
                  </Link>
                  <a href="/">О чём молчат анализы?</a>
                  <a href="/">Диеты - мифы и реальность?</a>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle} onClick={handleClick1}>
                <span></span>Полезные статьи
              </div>
              {openMenu1 && (
                <div
                  className={
                    !isMobile
                      ? styles.dropdownContent
                      : styles.dropdownContentMobile
                  }
                >
                  <Link href="/programs">правильное питание</Link>
                  <a href="/">организация пространства на кухне</a>
                  <a href="/">лайфхаки по хранению продуктов</a>
                  <Link href="/kids">советы по выбору продуктов</Link>
                </div>
              )}
            </div>
            <div className={styles.dropdown}>
              <Link
                className={styles.dropdownTitle}
                onClick={handleClick3}
                href="/"
              >
                <span></span>О сайте
              </Link>
            </div>
          </div>
        )}
        <div
          className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ""}
        }`}
          onClick={handleMenuToggle}
        >
          ☰
        </div>
      </nav>
    </>
  );
};
export default Navigation;
