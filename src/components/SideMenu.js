import React from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import styles from "./SideMenu.module.css";

const SideMenu = ({ items, onIconClick }) => {
  const history = useHistory();

  return (
    <div className={styles.menu}>
      <div className={styles.contentContainer}>
        {items.map((mi) => {
          return (
            <React.Fragment key={mi.id}>
              <div
                className={classNames({
                  [styles.active]: history.location.pathname === mi.path,
                  [styles.menuItem]: true,
                })}
              >
                <Link style={{ flex: 1 }} key={mi.id} to={mi.path}>
                  <div className={styles.text}>{mi.text}</div>
                </Link>
                {mi.icon && (
                  <div
                    onClick={() => onIconClick(mi.id)}
                    className={styles.icon}
                  >
                    <img
                      alt={"Trash bin icon"}
                      src={require(`../static/svg/${mi.icon}.svg`).default}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
