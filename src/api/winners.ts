import type { Winner } from "../types/models";

const API_URL: string = 'http://127.0.0.1:3000';


// export async function getWinners(
//   page: number,
//   limit = 10,
//   sort: 'id' | 'wins' | 'time' = 'id',
//   order: 'ASC' | 'DESC' = 'ASC'
// ): Promise<{ winners: Winner[]; totalCount: number }> {
//   try {
//     const url = new URL(`${API_URL}/winners`);
//     url.searchParams.append('_page', page.toString());
//     url.searchParams.append('_limit', limit.toString());
//     url.searchParams.append('_sort', sort);
//     url.searchParams.append('_order', order);

//     const response = await fetch(url.toString(), {
//       headers: {
//         'Accept': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       throw new Error(
//         errorData?.message || 
//         `Failed to fetch winners. Status: ${response.status}`
//       );
//     }

//     const winners: Winner[] = await response.json();
//     const totalCountHeader = response.headers.get('X-Total-Count');
//     const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : winners.length;

//     // Validate the response structure
//     if (!Array.isArray(winners)) {
//       throw new Error('Invalid winners data format received from server');
//     }

//     return { winners, totalCount };
//   } catch (error) {
//     console.error('Error fetching winners:', error);
//     throw new Error(
//       error instanceof Error ? error.message : 'Failed to fetch winners'
//     );
//   }
// }


export async function getWinners(
  page: number,
  limit = 10,
  sort: 'id' | 'wins' | 'time' = 'id',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<{ winners: Winner[]; totalCount: number }> {
  try {
    const url = new URL(`${API_URL}/winners`);
    url.searchParams.append('_page', page.toString());
    url.searchParams.append('_limit', limit.toString());
    url.searchParams.append('_sort', sort);
    url.searchParams.append('_order', order);

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || 
        `Failed to fetch winners. Status: ${response.status}`
      );
    }

    const winners: Winner[] = await response.json();
    const totalCountHeader = response.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : winners.length;

    if (!Array.isArray(winners)) {
      throw new Error('Invalid winners data format received from server');
    }

    return { winners, totalCount };
  } catch (error) {
    console.error('Error fetching winners:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch winners'
    );
  }
}

export async function getAllWinners(
  sort: 'id' | 'wins' | 'time' = 'id',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<{ winners: Winner[]; totalCount: number }> {
  try {
    // First fetch just to get the total count
    const { totalCount } = await getWinners(1, 1, sort, order);
    
    if (totalCount === 0) {
      return { winners: [], totalCount: 0 };
    }

    // Calculate how many parallel requests we need
    const limit = 10;
    const totalPages = Math.ceil(totalCount / limit);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Fetch all pages in parallel
    const pagePromises = pageNumbers.map(page => 
      getWinners(page, limit, sort, order)
    );

    const pages = await Promise.all(pagePromises);
    const allWinners = pages.flatMap(page => page.winners);

    return { 
      winners: allWinners, 
      totalCount 
    };
  } catch (error) {
    console.error('Error fetching all winners:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch all winners'
    );
  }
}


export async function getWinnerById(id: number): Promise<Winner | null> {
  const res = await fetch(`${API_URL}/winners/${id}`);
  if (res.status === 404) return null; // Not found
  if (!res.ok) throw new Error('Failed to fetch winner');
  return res.json();
}

export async function updateWinner(id: number, data: { wins: number; time: number }): Promise<Winner> {
  const res = await fetch(`${API_URL}/winners/${id}`, {
    method: 'PUT', // Or PATCH if your API supports
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update winner');
  return res.json();
}

export async function createWinner(data: { id: number; wins: number; time: number }): Promise<Winner> {
  const res = await fetch(`${API_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create winner: ${errorText}`);
  }
  return res.json();
}
