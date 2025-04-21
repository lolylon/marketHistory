import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Создаем конфиг для axios с токеном
    const getAxiosConfig = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin/login');
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            setError('Ошибка при загрузке товаров');
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await axios.put(
                    `${API_URL}/products/${editingProduct.id}`, 
                    formData,
                    getAxiosConfig()
                );
            } else {
                await axios.post(
                    `${API_URL}/products`,
                    formData,
                    getAxiosConfig()
                );
            }
            setShowModal(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            setError('Ошибка при сохранении товара');
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                await axios.delete(
                    `${API_URL}/products/${id}`,
                    getAxiosConfig()
                );
                fetchProducts();
            } catch (error) {
                setError('Ошибка при удалении товара');
                console.error('Error deleting product:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            image: '',
            category: ''
        });
        setEditingProduct(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Панель администратора</h2>
                <Button variant="danger" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                Добавить товар
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(product)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Изображение (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editingProduct ? 'Сохранить изменения' : 'Добавить товар'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminDashboard; 