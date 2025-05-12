import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('/api/notes/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error while loading the stats', err));
  }, []);

  return (
    <div>
      <h2>Notes pro user</h2>
      <ul>
        {stats.map((item) => (
          <li key={item.userId}>
            {item.username}: {item.totalNotes} Notes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsPage;