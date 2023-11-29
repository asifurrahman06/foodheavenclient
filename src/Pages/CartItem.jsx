import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function CartItem({ item, removeFromCart, updateCartItem, confirmOrder }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={4}>
            <Card.Img variant="top" src={item.foodPicture} alt={item.foodName} />
          </Col>
          <Col md={8}>
            <Card.Title>{item.foodName}</Card.Title>
            <Card.Text>
              Price: {item.foodPrice}
            </Card.Text>
            <Card.Text>
              Quantity: {item.quantity}
            </Card.Text>
            <Button variant="outline-primary" onClick={() => updateCartItem(item._id, item.quantity + 1)}>+</Button>
            <Button variant="outline-primary" onClick={() => updateCartItem(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
            <Button variant="outline-danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
            { !item.confirmed && <Button variant="success" onClick={() => confirmOrder(item._id)}>Confirm Order</Button>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
