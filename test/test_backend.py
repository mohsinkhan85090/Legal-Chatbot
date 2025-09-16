import unittest
import json
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from app import app

class TestLegalChatbot(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_health_check(self):
        """Test the health check endpoint"""
        response = self.app.get('/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
    
    def test_chat_endpoint_valid_query(self):
        """Test chat endpoint with valid query"""
        payload = {'query': 'What are my rights if arrested?'}
        response = self.app.post('/chat', 
                                data=json.dumps(payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('answer', data)
        self.assertEqual(data['status'], 'success')
    
    def test_chat_endpoint_empty_query(self):
        """Test chat endpoint with empty query"""
        payload = {'query': ''}
        response = self.app.post('/chat',
                                data=json.dumps(payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_chat_endpoint_missing_query(self):
        """Test chat endpoint with missing query field"""
        payload = {}
        response = self.app.post('/chat',
                                data=json.dumps(payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
    
    def test_chat_rights_keyword(self):
        """Test chat response for rights-related query"""
        payload = {'query': 'rights when arrested'}
        response = self.app.post('/chat',
                                data=json.dumps(payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('fundamental rights', data['answer'])
    
    def test_chat_consumer_keyword(self):
        """Test chat response for consumer-related query"""
        payload = {'query': 'consumer protection defective goods'}
        response = self.app.post('/chat',
                                data=json.dumps(payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('Consumer Protection Act', data['answer'])

if __name__ == '__main__':
    unittest.main()