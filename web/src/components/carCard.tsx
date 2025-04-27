import { Card, Tag, Button, Space, Divider, Typography, Image } from 'antd';
import {
  CarOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  InfoCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Car } from '../lib/types';
import { useEffect, useState } from 'react';
import API from '../api/carApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';

const { Text, Title } = Typography;

const CarCard = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined)  return;
        const fetchCar = async() => {
            try {
                const car = await API.get(`/${id}`)
                setCar(car.data);
            } catch (err) {
                console.error("Failed to fetch Car",err);
            }
        }
        fetchCar();
    },[]);

  const getFuelTypeColor = (fuelType: any) => {
    switch (fuelType) {
      case 'Petrol': return 'orange';
      case 'Diesel': return 'volcano';
      case 'Electric': return 'green';
      case 'Hybrid': return 'cyan';
      default: return 'blue';
    }
  };

  const getTransmissionIcon = (transmission: any) => {
    return transmission === 'Automatic' ? 'A' : 'M';
  };

  const confirmDeleteCar = (id: string) => {
    setSelectedCarId(id);   // Save car id
    setShowModal(true);     // Just show the modal
  };

  const handleDeleteCar = async (id: string) => {
    try {
      await API.delete(`/${id}`);
      toast.success('Car deleted successfully!');
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete car. Please try again.');
    } finally {
      setShowModal(false);
      setSelectedCarId(null);
    }
  };



  return (
    <div className='bg-gray-100 h-screen'>
        <div className='flex items-center justify-center pb-4 w-96 md:w-[850px] pt-4'>
          <button 
            onClick={() => navigate('/')} 
            className="text-blue-500 hover:underline text-lg flex items-center gap-2"
          >
            <span className='bg-white rounded-full px-1.5 py-1.5'>
              <ChevronLeft className='w-8 h-8' />
            </span>
            Back to Car List
          </button>
        </div>
        <div className='flex justify-center'>
            <Card
                hoverable
                style={{ width: 450, margin: '16px' }}
                cover={
                    car?.imageUrl ? (
                    <Image 
                        alt={`${car.brand} ${car.model}`} 
                        src={car.imageUrl ?? '/carImage.png'}
                        height={200}
                        style={{ objectFit: 'cover' }}
                    />
                    ) : (
                    <div style={{ 
                        height: 200, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                        className='bg-sky-100'
                    >
                        <Image 
                            alt={"carImage"} 
                            src={'/carImage.png'}
                            height={200}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    )
                }
                actions={[
                    <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        onClick={() => navigate(`/edit/${id}`)}
                    >
                        Edit
                    </Button>,
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => confirmDeleteCar(car?._id ?? "") }
                    >
                        Delete
                    </Button>
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0 }}>
                        {car?.brand} {car?.model}
                    </Title>
                    <Tag color={car?.availability ? 'success' : 'error'}>
                        {car?.availability ? 'Available' : 'Unavailable'}
                    </Tag>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Text type="secondary"><CalendarOutlined /> Year:</Text>
                        <Text strong style={{ marginLeft: 8 }}>{car?.year}</Text>
                    </div>

                    <div>
                        <Text type="secondary"><CarOutlined /> Color:</Text>
                        <Tag color="processing" style={{ marginLeft: 8 }}>
                            {car?.color}
                        </Tag>
                    </div>

                    <div>
                        <Text type="secondary"><SafetyOutlined /> VIN:</Text>
                        <Text code style={{ marginLeft: 8 }}>{car?.vin}</Text>
                    </div>

                    <div>
                        <Text type="secondary"><CarOutlined /> Reg. Number:</Text>
                        <Text strong style={{ marginLeft: 8 }}>{car?.registrationNumber}</Text>
                    </div>

                    <div>
                        <Text type="secondary"><DashboardOutlined /> Mileage:</Text>
                        <Text strong style={{ marginLeft: 8 }}>
                            {car?.mileage.toLocaleString()} km
                        </Text>
                    </div>

                    <div>
                        <Text type="secondary">Fuel:</Text>
                        <Tag color={getFuelTypeColor(car?.fuelType)} style={{ marginLeft: 8 }}>
                            {car?.fuelType}
                        </Tag>
                        <Text type="secondary" style={{ marginLeft: 16 }}>Transmission:</Text>
                        <Tag style={{ marginLeft: 8 }}>
                            {getTransmissionIcon(car?.transmission)}
                        </Tag>
                    </div>

                    <div>
                        <Text type="secondary"><DollarOutlined /> Price:</Text>
                        <Text strong style={{ marginLeft: 8 }}>
                            ฿{car?.rentalPricePerDay.toLocaleString()}/day
                        </Text>
                    </div>

                    <div>
                        <Text type="secondary"><EnvironmentOutlined /> Location:</Text>
                        <Text strong style={{ marginLeft: 8 }}>{car?.location}</Text>
                    </div>

                    {car?.notes && (
                    <div>
                        <Text type="secondary"><InfoCircleOutlined /> Notes:</Text>
                        <Text style={{ marginLeft: 8 }}>{car.notes}</Text>
                    </div>
                    )}
                </Space>
            </Card>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className='bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-lg animate-fadeIn'>
                    <div className=''>
                    <h2 className='text-lg font-semibold text-gray-800 mb-4 text-center'>
                        Are you absolutely sure?
                    </h2>
                    <p className='text-gray-600 text-center mb-6'>
                        This action cannot be undone. This will permanently delete selected car information
                    </p>
                    </div>
                    <div className='flex justify-end gap-4'>
                    <button 
                        onClick={() => setShowModal(false)}
                        className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                        if (selectedCarId) {
                            handleDeleteCar(selectedCarId);
                        }
                        }}
                        className='px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition cursor-pointer'
                    >
                        Delete
                    </button>
                    </div>
                </div> 
                </div>
            )}
        </div>
    </div>
    
    
  );
};

export default CarCard;