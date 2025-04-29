import { Alert, Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

//* types
import type { JSX } from 'react'

interface AlertBoxProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  buttonLabel?: string;
  onClickButton?: () => void;
}

const AlertBox: React.FC<AlertBoxProps> = ({
  message,
  type,
  buttonLabel,
  onClickButton,
}): JSX.Element => {
  const navigate = useNavigate();

  const handleOnClickButton = (): void => {
    if (onClickButton) {
      onClickButton()
    } else {
      navigate('/')
    }
  }

  return (
    <Card className="md:w-2/3 mx-auto mt-4">
      <Alert message={message} type={type} showIcon />
      {buttonLabel && (
        <Button className="mt-4" type="primary" onClick={handleOnClickButton}>
          {buttonLabel}
        </Button>
      )}
    </Card>
  )
}

export default AlertBox