import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { 
  Table,
  Badge,
  Button
} from 'react-bootstrap';

const Orders = () => {
  const { user } = useAuth();
  const { orders } = useProducts();
  
  const userOrders = React.useMemo(() => {
    return orders.filter(order => order.userId === user?.id);
  }, [orders, user?.id]);
  
  return (
    <div>
      <h2 className="h5 mb-4">My Orders</h2>
      
      {userOrders.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted mb-3">You haven't placed any orders yet.</p>
          <Button
            as={Link}
            to="/products"
            variant="primary"
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.items.length}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <Badge bg={order.status === 'pending' ? 'warning' : 'success'}>
                    {order.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/orders/${order.id}`}
                    variant="outline-primary"
                    size="sm"
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Orders;