import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Сначала проверяем, что это админ
            if (username === 'admin' && password === 'admin') {
                // Создаем временный токен для админа
                const adminToken = 'admin-token-' + Date.now();
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('adminToken', adminToken);
                navigate('/admin/dashboard');
            } else {
                setError('Неверные учетные данные');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Ошибка при входе');
        }
    };

    return (
        <Container className="mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Вход в админ-панель</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Войти
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AdminLogin; 