import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Statistics from './features/statistics/Statistics';
import Orders from "./features/orders/Orders";
import OrderDetail from "./features/order/OrderDetail";
import AddOrder from "./features/addOrder/AddOrder";
import EditOrder from "./features/editOrder/editOrder";

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path="/estadisticas" component={Statistics} />
        <Route path="/pedidos/new" exact component={AddOrder} />
        <Route path="/pedidos/:id/edit" exact component={EditOrder} />
        <Route path="/pedidos/:id" component={OrderDetail} />
        <Route path="/pedidos" component={Orders} />
        <Route path="/" component={Statistics}/>
      </Switch>
    </Router>
  );
}

export default App;
