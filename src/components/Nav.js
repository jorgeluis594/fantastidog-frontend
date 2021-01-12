import React, { useRef }from 'react';

import { 
  Box, 
  Heading, 
  List, 
  ListItem, 
  Link,
  Menu, 
  MenuButton,
  MenuList, 
  MenuItem, 
  IconButton,
  useDisclosure, 
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader
} from '@chakra-ui/core';

import { Link as ReachLink } from 'react-router-dom';

function NavItem ({url, text}) {
  return (
    <ListItem mr={3}>
      <Link 
        as={ReachLink}
        to={url}
        textDecoration="none" 
        color="gray.600"
        _hover={{
          textDecoration: "none"
        }}
        >{text}
      </Link>
    </ListItem>
  );
}


export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box as="header"
        display="flex"
        pos="sticky" 
        height={["3rem", "3rem","4rem"]}
        width="full"
        borderBottom="1px" 
        borderColor="gray.300"
        alignItems="center"
        px="6"
        justifyContent="space-between"
      >
        <Box as="nav" display={["none", null, "flex"]} >
          <List as="ul" display="flex">
            <NavItem url="/estadisticas" text="Estadisticas"/>
            <NavItem url="/pedidos" text="Pedidos" />
            <NavItem url="/pedidos/new" text="Agregar Pedido"/>
            <Menu as={ListItem}>
              <MenuButton 
                color="gray.600"
                border="none"
                outline="none"
              >Otros</MenuButton>
              <MenuList>
                <MenuItem color="gray.600"><ReachLink to="/delivery">Deliveries</ReachLink></MenuItem>
                <MenuItem color="gray.600"><ReachLink to="/delivery">Productos</ReachLink></MenuItem>
              </MenuList>
            </Menu>
          </List>
        </Box> 
        <IconButton ref={btnRef} onClick={onOpen} icon="menu" display={["flex", null, "none"]} variant="ghost"/>
        <Drawer
        size="xs"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        >
          <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Fantastidog</DrawerHeader>
          <DrawerBody as="nav">
            <List as="ul" spacing={3}>
              <ListItem><ReachLink to="/estadisticas">Estadisticas</ReachLink></ListItem>
              <ListItem><ReachLink to="/pedidos">Pedidos</ReachLink></ListItem>
              <ListItem><ReachLink to="/pedidos/new">Agregar Pedido</ReachLink></ListItem>
              <ListItem><ReachLink to="/deliveries">Delivery</ReachLink></ListItem>
              <ListItem><ReachLink to="/productos">Productos</ReachLink></ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
        </Drawer>
        <Box>
          <Heading fontSize={["md", "xl"]} fontFamily="title" fontWeight="bold">FantastiApp</Heading>
        </Box>
      </Box>
  );
}