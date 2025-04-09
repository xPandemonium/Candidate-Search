import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
  const [isUsernameSortedAsc, setIsUsernameSortedAsc] = useState(true);

  // Retrieve saved candidates from local storage
  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem('savedCandidates');
    if (savedCandidatesFromStorage) {
      setSavedCandidates(JSON.parse(savedCandidatesFromStorage));
    }
  }, []);

  // Delete a candidate from the saved list
  const handleDeleteCandidate = (index: number) => {
    const updatedSavedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  // Sort the candidates by name
  const handleSortByName = () => {
    const sortedCandidates = [...savedCandidates].sort((a, b) => {
      if (isSortedAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSavedCandidates(sortedCandidates);
    setIsSortedAsc(!isSortedAsc);
  };

  // Sort the candidates by username
  const handleSortByUsername = () => {
    const sortedCandidates = [...savedCandidates].sort((a, b) => {
      if (isUsernameSortedAsc) {
        return a.login.localeCompare(b.login);
      } else {
        return b.login.localeCompare(a.login);
      }
    });
    setSavedCandidates(sortedCandidates);
    setIsUsernameSortedAsc(!isUsernameSortedAsc);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th onClick={handleSortByName} style={{ cursor: 'pointer' }}>
                Name {isSortedAsc ? '▲' : '▼'}
              </th>
              <th onClick={handleSortByUsername} style={{ cursor: 'pointer' }}>
                Username {isUsernameSortedAsc ? '▲' : '▼'}
              </th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((savedCandidate, index) => (
              <tr key={index}>
                <td>
                  <div className="flex-container">
                    <img src={savedCandidate.avatar_url || 'null'} alt={`${savedCandidate.name || 'null'}'s avatar`} className="img" />
                  </div>
                </td>
                <td>
                  <div className="flex-container">{savedCandidate.name || 'null'}</div>
                </td>
                <td>
                  <div className="flex-container">{savedCandidate.login || 'null'}</div>
                </td>
                <td>
                  <div className="flex-container">{savedCandidate.location || 'null'}</div>
                </td>
                <td>
                  <div className="flex-container">{savedCandidate.email || 'null'}</div>
                </td>
                <td>
                  <div className="flex-container">{savedCandidate.company || 'null'}</div>
                </td>
                <td>
                  <div className="flex-container">
                    <a href={savedCandidate.html_url || '#'} target="_blank" rel="noopener noreferrer">
                      {savedCandidate.html_url || 'null'}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex-container">
                    <button onClick={() => handleDeleteCandidate(index)} className='red'>-</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No candidates have been accepted</div>
      )}
    </>
  );
};

export default SavedCandidates;