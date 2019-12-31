import React from 'react';
import { Layout, Menu, Icon, Popconfirm, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth'
import { Route, Link } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import { useEffect } from 'react';
import ProductAdmin from '../components/ProductAdmin/ProductAdmin';

const { Header, Content, Sider } = Layout;



const AdminPage = ({ }) => {
    useEffect(() => {

    }, [])


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" style={{ backgroundColor: '#111', display: 'flex', justifyContent: 'center' }}>
                <div className="logo" style={{
                    padding: 10,
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: ' 16px 28px 16px 0',
                    float: ' left',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <p style={{ margin: 0, fontSize: 14, color: '#fff', fontWeight: 'bold' }}>LADY ROSE ADMIN</p>
                </div>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="sub1">
                            <Link to='/admin/lady-rose-coffee/'>
                                <Icon type="coffee" />
                                All Products
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub2">
                            <Link to='/admin/lady-rose-coffee/add-product'>
                                <Icon type="laptop" />Add Product
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub3"><Icon type="database" />Systems</Menu.Item>
                        <Menu.Item key="sub4"><Icon type="mail" />Messages</Menu.Item>
                        <Menu.Item key="sub5">
                            <Popconfirm title='Are you sure want to log out?' onConfirm={() => firebase.auth().signOut().then(() => window.location.pathname = '/')}>
                                <Icon type='logout' />
                                Log Out
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Route render={() => <AddProduct />} path='/admin/lady-rose-coffee/add-product' />
                        <Route render={() => <ProductAdmin />} path='/admin/lady-rose-coffee/' />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}



export default AdminPage;