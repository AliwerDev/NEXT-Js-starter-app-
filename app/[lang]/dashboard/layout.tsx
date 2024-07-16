"use client";

import React, { ReactNode } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme } from "antd";
import { useSettingsContext } from "@/src/settings/hooks";
import { useDashboardMenus } from "@/src/hooks/use-dashboard-menus";
import { LanguageElements } from "@/src/shared/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";

const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const { sidebar_collapsed, theme: apptheme, changeMode, updateData } = useSettingsContext();
  const menus = useDashboardMenus();
  const { t } = useTranslation(lang);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthGuard lang={lang}>
      <Layout className="h-screen">
        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          trigger={null}
          collapsible
          collapsed={sidebar_collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            theme={apptheme}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menus}
          />
        </Sider>
        <Layout>
          <Header style={{ paddingInline: "20px", background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button type="text" icon={sidebar_collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => updateData({ sidebar_collapsed: !sidebar_collapsed })} />

            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
              <Button type="text" icon={apptheme == "dark" ? <SunOutlined /> : <MoonOutlined />} onClick={() => changeMode(apptheme == "dark" ? "light" : "dark")} />
            </Flex>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
};

export default App;
