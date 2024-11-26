"use client";

import { AuthorList } from "@/components/authorList";
import { BookList } from "@/components/bookList";
import { apolloClient } from "@/lib/api";
import { capitalize } from "@/lib/utils";
import { ApolloProvider } from "@apollo/client";
import { Breadcrumb, Flex, Layout, Menu, MenuProps, theme } from "antd";
import { BookOpenText, PenToolIcon, StoreIcon } from "lucide-react";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuKey, setSelectedMenuKey] = useState("books");

  const menuItems: MenuProps["items"] = [
    {
      key: "books",
      icon: (
        <Flex
          vertical={false}
          align="center"
          justify="center"
          style={{ gap: "12px" }}
        >
          <BookOpenText /> Books
        </Flex>
      ),
      label: "",
    },
    {
      key: "authors",
      icon: (
        <Flex
          vertical={false}
          align="center"
          justify="center"
          style={{ gap: "12px" }}
        >
          <PenToolIcon /> Authors
        </Flex>
      ),
      label: "",
    },
  ];

  return (
    <ApolloProvider client={apolloClient}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="demo-logo"
            style={{
              color: "yellow",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <Flex vertical={false} align="center" style={{ gap: "12px" }}>
              <StoreIcon /> Bookstore
            </Flex>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["books"]}
            selectedKeys={selectedMenuKey ? [selectedMenuKey] : []}
            items={menuItems}
            onSelect={({ item, key }) => {
              setSelectedMenuKey(key);
            }}
            style={{
              flex: 1,
              minWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Header>
        <Content style={{ padding: "12px 48px", height: "100%" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Home" }, { title: capitalize(selectedMenuKey) }]}
          />
          <div
            style={{
              background: colorBgContainer,
              minHeight: "100vh",
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedMenuKey == "books" ? <BookList /> : <AuthorList />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Shubham Laddha using
          Ant UED
        </Footer>
      </Layout>
    </ApolloProvider>
  );
};

export default LandingPage;
