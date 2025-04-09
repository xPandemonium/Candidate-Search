import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [Candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [currentIdex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
      const data = await searchGithub();
      setCandidates(data);

      if (data.length > 0){
        const candidateData = await searchGithubUser(data[0].login);
        setCandidate(candidateData);
        console.log(candidateData);
        
      }
      } catch (error){
      setError('Error fetching data');
      console.log(error);
      }
    }

    const savedCandidatesStored = localStorage.getItem('savedCandidates');
    if (savedCandidatesStored){
      setSavedCandidates(JSON.parse(savedCandidatesStored));
    }

    fetchData();
  }, []);
  
  const saveCandidate = () => {
    if (Candidate){
      const newSavedCandidates = [...savedCandidates, Candidate];
      setSavedCandidates(newSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(newSavedCandidates));
      nextCandidate();
    }
  }

  const previousCandidate = async () => {
    if (currentIdex > 0){
      setCurrentIndex(currentIdex - 1);
      const previousCandidate = await searchGithubUser(candidates[currentIdex - 1].login)
        setCandidate(previousCandidate);
    }
  }

  const nextCandidate = async () => {
    if (currentIdex < candidates.length - 1){
      setCurrentIndex(currentIdex + 1);
      const nextCandidate = await searchGithubUser(candidates[currentIdex + 1].login);
        setCandidate(nextCandidate);
    }

    if(error){
      return (<h1>{error}</h1>);
    }
  }


  return (
    <div>
      <h1>Candidate Search</h1>
      {Candidate ? (
        <div>
          <div>
            <img src={Candidate.avatar_url || 'null'} alt={`${Candidate.name || "null"}'s name`} />
            <h2>Name: {Candidate.name || 'null'}</h2>
            <p>Username: {Candidate.login || 'null'}</p>
            <p>Email: {Candidate.email || 'null'}</p>
            <p>Location: {Candidate.location || 'null'}</p>
            <p>Company: {Candidate.company || 'null'}</p>
            <p>
              <a href={Candidate.html_url || '#'} target="_blank" rel="noreferrer">
                Github Profile
              </a>
            </p>
          </div>
          <div>
            <button onClick={previousCandidate}>Previous</button>
            <button onClick={saveCandidate} className='green'>Save</button>
            <button onClick={nextCandidate} className='red'>Next</button>
          </div>
        </div>
          ) 
      : 
      (<p>No Candidates Found</p> )}
    </div>
  );
};

export default CandidateSearch
