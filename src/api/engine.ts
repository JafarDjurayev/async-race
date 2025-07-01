// const API_URL: string = 'http://127.0.0.1:3000';

// export async function startEngine(id: number) {
//   const res = await fetch(`${API_URL}/engine?id=${id}&status=started`, {
//     method: 'PATCH',
//   });
//   if (!res.ok) throw new Error(`Failed to start engine for car #${id}`);
//   return res.json(); // returns { velocity, distance }
// }

// export async function driveEngine(id: number) {
//   const res = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
//     method: 'PATCH',
//   });
//   if (!res.ok) throw new Error(`Failed to drive engine for car #${id}`);
//   return res.json(); // returns { success: true }
// }

// export async function stopEngine(id: number) {
//   const res = await fetch(`${API_URL}/engine?id=${id}&status=stopped`, {
//     method: 'PATCH',
//   });
//   if (!res.ok) throw new Error(`Failed to stop engine for car #${id}`);
//   return res.json(); // usually empty body
// }

const API_URL: string = 'http://127.0.0.1:3000';
import { useRaceStore } from '../app/zustand/useRaceStore';

export async function startEngine(id: number) {
  try {
    const res = await fetch(`${API_URL}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });

    if (!res.ok) {
      useRaceStore.getState().stopEngine(id);
      throw new Error(`Failed to start engine for car #${id}`);
    }

    const { velocity, distance } = await res.json();
    const duration = distance / velocity / 1000; // Convert to seconds

    // Update store with engine started state
    useRaceStore.getState().startEngine(id, velocity, distance);

    return { velocity, distance, duration };
  } catch (error) {
    useRaceStore.getState().stopEngine(id);
    console.error(`Start engine error for car #${id}:`, error);
    throw error;
  }
}

export async function driveEngine(id: number) {
  try {
    console.log(`Attempting to drive car #${id}...`);
    const res = await fetch(`${API_URL}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`Drive failed for car #${id}:`, res.status, errorData);
      throw new Error(`Drive failed (${res.status})`);
    }

    const data = await res.json();
    console.log(`Drive success for car #${id}:`, data);

    // CRITICAL: Update Zustand store
    useRaceStore.getState().driveEngine(id);
    return data;
  } catch (error) {
    console.error(`Drive engine error for car #${id}:`, error);
    useRaceStore.getState().stopEngine(id);
    throw error;
  }
}

export async function stopEngine(id: number) {
  try {
    const res = await fetch(`${API_URL}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    // Always update store even if request fails
    useRaceStore.getState().stopEngine(id);

    if (!res.ok) {
      throw new Error(`Failed to stop engine for car #${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Stop engine error for car #${id}:`, error);
    throw error;
  }
}

// Utility function for race control
export async function startRace(carIds: number[]) {
  try {
    // Start all engines first
    const results = await Promise.allSettled(carIds.map(id => startEngine(id)));

    // Check for failures
    const failedStarts = results.filter(r => r.status === 'rejected');
    if (failedStarts.length > 0) {
      throw new Error(`${failedStarts.length} cars failed to start`);
    }

    // Start driving all successful engines
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    await Promise.allSettled(carIds.map(id => driveEngine(id)));
  } catch (error) {
    console.error('Race error:', error);
    // Stop all cars if race fails
    await Promise.allSettled(carIds.map(id => stopEngine(id)));
    throw error;
  }
}
