import React from 'react';
import { Layout, Menu, Icon, Popconfirm, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth'
import { Route, Link } from 'react-router-dom';
import AddProduct from '../components/AddProduct/AddProduct';
import { useEffect } from 'react';
import ProductAdmin from '../components/ProductAdmin/ProductAdmin';
import AdminMessages from '../components/AdminMessages/AdminMessages';
import System from '../components/System/System';
import AdminOrders from '../components/AdminOrders/AdminOrders';

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
                        <Menu.Item key="sub3">
                            <Link to='/admin/lady-rose-coffee/system'>
                                <Icon type="database" />Systems
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub4">
                            <Link to='/admin/lady-rose-coffee/messages'>
                                <Icon type="mail" />Messages
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub5">
                            <Link to='/admin/lady-rose-coffee/Orders'>
                                <Icon type="dollar" />Orders
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub6">
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
                        <Route exact render={() => <AddProduct />} path='/admin/lady-rose-coffee/add-product' />
                        <Route exact render={() => <ProductAdmin />} path='/admin/lady-rose-coffee/' />
                        <Route exact render={() => <AdminMessages />} path='/admin/lady-rose-coffee/messages' />
                        <Route exact render={() => <System />} path='/admin/lady-rose-coffee/system' />
                        <Route exact render={() => <AdminOrders />} path='/admin/lady-rose-coffee/Orders' />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}



export default AdminPage;