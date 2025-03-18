"use client";
import { useAddItem } from "@/utils/modifyItems";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  SelectItem,
  Select,
  useDisclosure,
} from "@heroui/react";

import { itemTypes } from "@/models/ItemTypes";

export default function AddItem() {
  const { addNewItem } = useAddItem();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // on form submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.itemType && data.itemName && data.price && data.itemQuantity) {
      const price = parseInt(data.price as string);
      const quantity = parseInt(data.itemQuantity as string);
      const itemType = parseInt(data.itemType as string);
      addNewItem(price, data.itemName as string, quantity, itemType);
    }
  };

  return (
    <>
      <Button onPress={onOpen} variant="shadow">
        Add New Item
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Item
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full flex flex-col gap-4"
                  validationBehavior="native"
                  onSubmit={onSubmit}
                >
                  <Input
                    errorMessage="Please Enter the Item Price"
                    label="Price"
                    name="price"
                    placeholder="1.99"
                    type="number"
                  />
                  <Select
                    className="max-w-xs"
                    name="itemType"
                    label="Select an Item Type"
                    placeholder="Select a type"
                  >
                    {itemTypes.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    errorMessage="Please Enter an Item Name"
                    label="Item Name"
                    name="itemName"
                    placeholder="Cheese"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please Enter a Quantity"
                    label="Quantity"
                    name="itemQuantity"
                    placeholder="3"
                    type="number"
                    validate={(value) => {
                      if (parseInt(value) <= 0) {
                        return "Quantity Cannot be less than or equal to 0";
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button color="primary" type="submit" onPress={onClose}>
                      Submit
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      variant="flat"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
