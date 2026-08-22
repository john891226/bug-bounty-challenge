import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { defaultLanguages } from "../../i18n/i18n";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation("app");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={<Box>{t("changeLanguage")}</Box>}>
        <Button
          onClick={(ev: MouseEvent<HTMLElement>) => {
            setAnchorEl(ev.currentTarget);
          }}
        >
          {i18n.language}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        {defaultLanguages.map((language) => (
          <MenuItem
            key={language}
            onClick={() => {
              i18n.changeLanguage(language);
              setAnchorEl(null);
            }}
            selected={language === i18n.language}
          >
            <Typography
              fontWeight={language === i18n.language ? 700 : undefined}
            >
              {t(`languages.${language}`)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
