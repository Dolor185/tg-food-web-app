export const WelcomeModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <ModalContainer isOpen={isOpen} isClosing={isClosing}>
      <ModalContent>
        <h2>Welcome to the App!</h2>
        <p>Here are some tips to get started:</p>
        <ul>
          <li>Use the search bar to find your favorite meals.</li>
          <li>Scan barcodes for quick access to product information.</li>
          <li>Save your favorite meals for easy access later.</li>
        </ul>
        <Button onClick={handleClose}>Got it!</Button>
      </ModalContent>
    </ModalContainer>
  );
}