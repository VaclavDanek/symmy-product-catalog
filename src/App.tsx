import { ShopOutlined } from '@ant-design/icons'
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout, Typography, Button } from 'antd'
import { useTranslation } from 'react-i18next'

//* pages
import { ProductListPage, ProductDetailPage } from './pages'

//* types
import type { FC, JSX } from 'react'

const queryClient = new QueryClient()

const { Header, Content } = Layout
const { Title } = Typography

const App: FC = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout className="min-h-screen">
          <Header className="bg-white flex items-center shadow-md px-4">
            <Title level={1} className="m-0">
              <RouterLink to="/" className="flex items-center text-xl font-semibold">
                <ShopOutlined className="mr-2" />{t('productList.title')}
              </RouterLink>
            </Title>
          </Header>

          <Content className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="*" element={
                <div className="text-center">
                  <Title level={4} className="mb-4">
                    {t('notFound.title')}
                  </Title>
                  <Button type="primary">
                    <RouterLink to="/">
                      {t('notFound.backToHome')}
                    </RouterLink>
                  </Button>
                </div>
              } />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App