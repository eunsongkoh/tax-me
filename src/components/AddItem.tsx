"use client";
import { useAddItem } from "@/utils/modifyItems";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import Webcam from "react-webcam";

export default function AddItem() {
  const { addNewItem } = useAddItem();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onOpenChange: onPhotoChange,
  } = useDisclosure();

  const [photo, setPhoto] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // temp, get rid of later once implemented API
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (getScreenshot: () => string | null) => {
    const imageSrc = getScreenshot();
    setPhoto(imageSrc);
  };

  // on form submit
  const onSubmit = (e) => {
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Item
              </ModalHeader>
              <ModalBody>
                <Button onPress={onPhotoChange}>
                  {isPhotoOpen ? "Cancel Photo" : "Take a Photo"}
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  label="Upload an Image"
                  onChange={handleImageUpload}
                />
                {isPhotoOpen && (
                  <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={{
                      facingMode: "user",
                    }}
                  >
                    {({ getScreenshot }) => (
                      <div>
                        <Button onPress={() => handleCapture(getScreenshot)}>
                          Capture Photo
                        </Button>
                      </div>
                    )}
                  </Webcam>
                )}

                {photo && (
                  <div>
                    <Image
                      src={photo}
                      alt="Captured Photo"
                      style={{ width: "100%", maxWidth: "400px" }}
                    />
                  </div>
                )}
                <Form
                  className="w-full max-w-xs flex flex-col gap-4"
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
                    label="Select an Item Type"
                    name="itemType"
                  >
                    <SelectItem key="1">Produce</SelectItem>
                    <SelectItem key="2">Alcoholic Beverages</SelectItem>
                    <SelectItem key="3">
                      Carbonated drinks, candies, snack foods
                    </SelectItem>
                    <SelectItem key="4">Prepared Foods</SelectItem>
                  </Select>
                  <Input
                    isRequired
                    errorMessage="Please Enter an Item Name"
                    label="Item Name"
                    name="itemName"
                    placeholder="Cheese"
                    type="text"
                  ></Input>
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
